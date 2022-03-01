import { Page } from "./constants";
import StartPage from "./StartPage";
import ToysPage from "./ToysPage";
import TreePage from "./TreePage";

class PageLoader {
  private base: HTMLElement;
  private startPage: StartPage;
  private currentPage: StartPage | ToysPage | TreePage;
  private toysPage: ToysPage;
  private treePage: TreePage;
 
  constructor(div: HTMLElement) {
    this.base = div;
    this.startPage = new StartPage(this.base);
    this.toysPage = new ToysPage(this.base);
    this.treePage = new TreePage(this.base);
    this.currentPage = this.startPage;
  }

  private hide() {
    this.base.classList.add('hide-block');
    setTimeout(this.remove, 500, this);
  }

  private remove(self: this) {
    self.base.textContent = '';
    self.reload();
  }

  private reload() {
    this.currentPage.render();
    this.base.classList.remove('hide-block');
  }

  public startUp() {
    this.currentPage.render();
	}

  public goto (state: string) {
    switch (state) {
      case Page.start:
        this.currentPage = this.startPage;
      break;
      case Page.toys:
        this.currentPage = this.toysPage;
      break;
      case Page.tree:
        this.currentPage = this.treePage;
      break;
      default:
        this.currentPage = this.startPage;
      break;
    }
    this.hide();
  }
  
}

export default PageLoader;
