import Card from "@/components/Card";
import StatBlock from "@/components/StatBlock";
import { cn, getOrdinal } from "@/lib/utils";

const SpellCard = ({ spell, ...props }) => {
  return (
    <Card
      withBar
      className={cn("bg-fantasy-bg", props.className)}
      onDismiss={props.onDismiss}
    >
      <StatBlock>
        <StatBlock.Heading
          title={spell.name}
          subtitle={
            spell.level === "cantrip"
              ? "Cantrip"
              : `${getOrdinal(spell.level)}-level ${spell.school}`
          }
        />
        <StatBlock.PropertyLine title={"Casting Time:"}>
          {spell.casting_time}
        </StatBlock.PropertyLine>
        <StatBlock.PropertyLine title={"Range:"}>
          {spell.range}
        </StatBlock.PropertyLine>
        <StatBlock.PropertyLine title={"Components:"}>
          {["V", "S", "M"]
            .filter(
              (c, i) => spell.components[["verbal", "somatic", "material"][i]],
            )
            .join(", ") +
            (spell.components.materials_needed
              ? ` (${spell.components.materials_needed.join(", ")})`
              : "")}
        </StatBlock.PropertyLine>
        <StatBlock.PropertyLine title={"Duration:"}>
          {spell.duration}
        </StatBlock.PropertyLine>

        <StatBlock.Description>{spell.description}</StatBlock.Description>
      </StatBlock>
    </Card>
  );
};

export default SpellCard;
