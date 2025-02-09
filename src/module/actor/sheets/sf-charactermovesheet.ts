import { VueApplication } from '../../applications/vueapp'
import { IronswornSettings } from '../../helpers/settings'
import { IronswornActor } from '../actor'

export class SFCharacterMoveSheet extends VueApplication {
  constructor(protected actor: IronswornActor) {
    super({})
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: 'systems/foundry-ironsworn/templates/actor/sf-charactermoves.hbs',
      resizable: true,
      classes: ['ironsworn', 'sheet', 'moves', `theme-${IronswornSettings.theme}`],
      width: 350,
      height: 800,
      left: 685,
    })
  }

  get title() {
    return `${game.i18n.localize('IRONSWORN.Moves')} — ${this.actor.name}`
  }

  async getData() {
    console.log(this)
    const data: any = super.getData()
    data.actor = this.actor.toObject(false)
    data.data = this.actor.data
    return data
  }
}
