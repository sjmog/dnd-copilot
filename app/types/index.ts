type Spell = {
  name: string;
  casting_time: string;
  classes: string[];
  components: {
    material: boolean;
    materials_needed?: string[];
    raw: string;
    somatic: boolean;
    verbal: boolean;
  };
  description: string;
  duration: string;
  level: string;
  range: string;
  ritual: boolean;
  school: string;
  tags: string[];
  type: string;
  higher_levels?: string;
};