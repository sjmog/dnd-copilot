"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
  LiveConnectionState,
  LiveTranscriptionEvent,
  LiveTranscriptionEvents,
  useDeepgram,
} from "../context/DeepgramContextProvider";
import {
  MicrophoneEvents,
  MicrophoneState,
  useMicrophone,
} from "../context/MicrophoneContextProvider";
import Visualizer from "./Visualizer";
import spellsJson from "@/data/spells.json";
import SpellCard from "@/components/SpellCard";
import { Spell } from "@/types";

const App: () => JSX.Element = () => {
  const spells = spellsJson as Spell[];
  const spellNames = spells.map((spell) => spell.name.toLowerCase());

  const [caption, setCaption] = useState<string | undefined>("Speak to start");
  const [detectedSpells, setDetectedSpells] = useState<Spell[]>([]);
  const { connection, connectToDeepgram, connectionState } = useDeepgram();
  const { setupMicrophone, microphone, startMicrophone, microphoneState } =
    useMicrophone();
  const captionTimeout = useRef<any>();
  const keepAliveInterval = useRef<any>();

  useEffect(() => {
    setupMicrophone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (microphoneState === MicrophoneState.Ready) {
      connectToDeepgram({
        model: "nova-2-meeting",
        interim_results: true,
        smart_format: true,
        filler_words: false,
        utterance_end_ms: 3000,
        keywords: [
          "Acid Splash:3",
          "Animal Friendship:3",
          "Bane:3",
          "Blade Ward:3",
          "Charm Person:3",
          "Chromatic Orb:3",
          "Color Spray:3",
          "Compelled Duel:3",
          "Comprehend Languages:3",
          "Create or Destroy Water:3",
          "Cure Wounds:3",
          "Detect Evil and Good:3",
          "Disguise Self:3",
          "Divine Favor:3",
          "Dissonant Whispers:3",
          "Druidcraft:3",
          "Eldritch Blast:3",
          "Ensnaring Strike:3",
          "Faerie Fire:3",
          "Expeditious Retreat:3",
          "Feather Fall:3",
          "Find Familiar:3",
          "Goodberry:3",
          "Grease:3",
          "Guidance:3",
          "Guiding Bolt:3",
          "Hail of Thorns:3",
          "Hellish Rebuke:3",
          "Hex:3",
          "Heroism:3",
          "Hunter's Mark:3",
          "Illusory Script:3",
          "Longstrider:3",
          "Mage Armor:3",
          "Mage Hand:3",
          "Poison Spray:3",
          "Prestidigitation:3",
          "Protection from Evil and Good:3",
          "Purify Food and Drink:3",
          "Ray of Sickness:3",
          "Searing Smite:3",
          "Shillelagh:3",
          "Thaumaturgy:3",
          "Thorn Whip:3",
          "Thunderous Smite:3",
          "Thunderwave:3",
          "Vicious Mockery:3",
          "Wrathful Smite:3",
          "Aid:3",
          "Blindness/Deafness:3",
          "Augury:3",
          "Lesser Restoration:3",
          "Prayer of Healing:3",
          "Spiritual Weapon:3",
          "Arcane Eye:3",
          "Beacon of Hope:3",
          "Blight:3",
          "Bestow Curse:3",
          "Blinding Smite:3",
          "Clairvoyance:3",
          "Compulsion:3",
          "Conjure Animals:3",
          "Conjure Barrage:3",
          "Counterspell:3",
          "Crusader's Mantle:3",
          "Daylight:3",
          "Dispel Magic:3",
          "Elemental Weapon:3",
          "Fear:3",
          "Feign Death:3",
          "Fireball:3",
          "Fly:3",
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphoneState]);

  const detectSpellsInText = (text: string): string[] => {
    const lowerText = text.toLowerCase();
    return spellNames.filter((spellName) => {
      const spellRegex = new RegExp(
        `\\b${spellName.replace(/\s+/g, "\\s+")}\\b`,
        "i",
      );
      return spellRegex.test(lowerText);
    });
  };

  const embroideredCaption = useMemo(() => {
    if (!caption) return "";

    const detectedSpellNames = detectSpellsInText(caption);
    return detectedSpellNames.reduce((acc, spellName) => {
      return acc.replace(
        new RegExp(`\\b${spellName}\\b`, "i"),
        `<span class="text-fantasy-primary font-fantasy-title text-2xl" style="font-variant: small-caps;">${spellName}</span>`,
      );
    }, caption || "");
  }, [caption, detectedSpells]);

  useEffect(() => {
    if (!microphone) return;
    if (!connection) return;

    const onData = (e: BlobEvent) => {
      // iOS SAFARI FIX:
      // Prevent packetZero from being sent. If sent at size 0, the connection will close.
      if (e.data.size > 0) {
        connection?.send(e.data);
      }
    };

    const onTranscript = (data: LiveTranscriptionEvent) => {
      const { is_final: isFinal, speech_final: speechFinal } = data;
      let thisCaption = data.channel.alternatives[0].transcript;

      if (thisCaption !== "") {
        const detectedSpellNames = detectSpellsInText(thisCaption);
        setDetectedSpells((prevSpells) => {
          const newSpells = spells.filter((spell) =>
            detectedSpellNames.includes(spell.name.toLowerCase()),
          );
          return [...new Set([...prevSpells, ...newSpells])];
        });
        setCaption(thisCaption);
      }

      if (isFinal && speechFinal) {
        clearTimeout(captionTimeout.current);
        captionTimeout.current = setTimeout(() => {
          setCaption(undefined);
          clearTimeout(captionTimeout.current);
        }, 3000);
      }
    };

    if (connectionState === LiveConnectionState.OPEN) {
      connection.addListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.addEventListener(MicrophoneEvents.DataAvailable, onData);

      startMicrophone();
    }

    return () => {
      // prettier-ignore
      connection.removeListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.removeEventListener(MicrophoneEvents.DataAvailable, onData);
      clearTimeout(captionTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionState]);

  useEffect(() => {
    if (!connection) return;

    if (
      microphoneState !== MicrophoneState.Open &&
      connectionState === LiveConnectionState.OPEN
    ) {
      connection.keepAlive();

      keepAliveInterval.current = setInterval(() => {
        connection.keepAlive();
      }, 10000);
    } else {
      clearInterval(keepAliveInterval.current);
    }

    return () => {
      clearInterval(keepAliveInterval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphoneState, connectionState]);

  return (
    <div className="antialiased h-full">
      <div className="h-[calc(100%-8rem)] bg-slate-600 overflow-y-auto">
        {detectedSpells.length === 0 ? (
          <div className="flex items-center justify-center text-white/60 italic text-fantasy-body p-6 h-full">
            Detected spells will appear here.
          </div>
        ) : (
          <div className="grid p-6 grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detectedSpells.map((spell, index) => (
              <SpellCard
                key={index}
                className="col-span-1"
                spell={spell}
                onDismiss={() =>
                  setDetectedSpells(
                    detectedSpells.filter((s) => s.name !== spell.name),
                  )
                }
              />
            ))}
          </div>
        )}
      </div>

      <div className="h-[8rem] bg-black shadow-sm relative">
        <div className="absolute inset-0 flex justify-center">
          <div className="max-w-4xl w-full mx-auto flex text-center items-center justify-center">
            {caption && (
              <span
                className="bg-black/70 p-8 text-fantasy-body"
                dangerouslySetInnerHTML={{ __html: embroideredCaption }}
              />
            )}
          </div>
        </div>

        <div className="absolute inset-0 flex justify-center">
          <div className="w-full mx-auto flex h-[8rem]">
            {microphone && <Visualizer microphone={microphone} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
