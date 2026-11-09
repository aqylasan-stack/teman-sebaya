export interface GameChoice {
  text: string;
  feedback: string;
  reflectionPoint: string;
}

export interface GameScenario {
  id: string;
  title: string;
  situation: string;
  category: 'Butterfly Effect' | 'Name That Feeling' | 'Digital Dilemma';
  choices: GameChoice[];
  takeaway: string;
}

