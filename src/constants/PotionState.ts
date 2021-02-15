export default class PotionState {
    static getDefaultState(): Potion {
      return {
        name: '',
        effect: '',
        ingredients: [],
        prize: 0,
        image: ''
      }
    }
  }
