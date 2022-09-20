export class Election {
    constructor(
        public name: String = "", 
        public start: String = "",
        public end: String = "",
        //public questions: Array<string>,
        public questions: Array<{question: String, answers: Array<String>}>,
        public description: string = "",
        public uuid: string = ""
      ) {
    }
  }