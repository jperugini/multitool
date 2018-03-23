import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ReflectiveInjector } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ToolbarService } from '../../services/toolbar.service';
import { ReportToolbarComponent } from '../report/report-toolbar/report-toolbar.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  entryComponents: [ReportToolbarComponent],
})
export class NavigationComponent implements OnInit {

  @ViewChild('NgxAsidePanelLeft') menu: any;
  @ViewChild('toolbar', { read: ViewContainerRef }) toolbar: ViewContainerRef;

  private backdropListener: any;

  private currentToolbar: any;

  constructor(private renderer: Renderer2,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _toolbarService: ToolbarService) { }

  ngOnInit() {
    this._toolbarService.getToolbarComponentToLoad().subscribe(
      component => {
        this.loadToolbar(component);
      }
    );
  }

  loadToolbar(componentToRender: any) {
    if (componentToRender !== null) {
      const resolvedInputs = ReflectiveInjector.resolve([]);

      // We create an injector out of the data we want to pass down and this components injector
      const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.toolbar.parentInjector);

      // We create a factory out of the component we want to create
      const factory = this._componentFactoryResolver.resolveComponentFactory(componentToRender);

      // We create the component using the factory and the injector
      const component = factory.create(injector);

      // Clear the ViewContainerRef to display new component
      this.toolbar.clear();

      this.currentToolbar = component.instance;

      // We insert the component into the dom container
      this.toolbar.insert(component.hostView);
    } else {
      this.toolbar.clear();
      this.currentToolbar = null;
    }
  }

  openMenu() {
    this.menu.show();
    // Add click handler on backdrop
    this.backdropListener = this.renderer.listen(this.menu.backdrop.location.nativeElement, 'click', (evt) => {
      this.onCancel();
    });
  }

  onCancel() {
    // Remove click handler first
    this.backdropListener();
    this.menu.hide();
  }

  onSave() {
    // Remove click handler first
    this.backdropListener();
    this.menu.hide();
  }

}
