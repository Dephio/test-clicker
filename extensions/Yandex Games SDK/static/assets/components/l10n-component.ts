import { _decorator, Component, Enum } from "cc";
const { ccclass, property } = _decorator;
import { l10n } from "../ysdk";
import { TranslateOptions } from "../core/l10n";

enum PostProcessType {
  NONE,
  CAPITALIZE_FIRST_LETTER,
  CAPITALIZE_EACH_WORD,
  UPPERCASE,
  LOWERCASE,
}

export abstract class L10nComponent extends Component {
  @property({ visible: false })
  _postProcess = PostProcessType.CAPITALIZE_EACH_WORD;

  get postProcess(): PostProcessType {
    return this._postProcess;
  }

  @property({ visible: true, type: Enum(PostProcessType) })
  set postProcess(value: PostProcessType) {
    this._postProcess = value;
    this.render();
  }

  abstract render(): void;

  protected translateKey(key: string) {
    const options: Partial<TranslateOptions> = {};

    switch (this._postProcess) {
      case PostProcessType.CAPITALIZE_EACH_WORD:
        options.postProcess = "capitalize";
        break;
      case PostProcessType.CAPITALIZE_FIRST_LETTER:
        options.postProcess = "capitalize_first";
        break;
      case PostProcessType.UPPERCASE:
        options.postProcess = "uppercase";
        break;
      case PostProcessType.LOWERCASE:
        options.postProcess = "lowercase";
        break;
    }

    return l10n.t(key, options);
  }
}
