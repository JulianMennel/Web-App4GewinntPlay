id: file:///C:/Users/ju200/Documents/HTWG/Web-App/web-app4gewinntplay/app/controllers/HomeController.scala:[682..685) in Input.VirtualFile("file:///C:/Users/ju200/Documents/HTWG/Web-App/web-app4gewinntplay/app/controllers/HomeController.scala", "package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import de.htwg.se.controller.controllerComponent.controllerBaseImpl.Controller
import com.google.inject.Guice
import de.htwg.se.MainModule
import de.htwg.se.model.fieldComponent.FieldInterface

@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  val injector = Guice.createInjector(new MainModule)
  val gameController = Controller(injector.getInstance(classOf[FieldInterface]))
  

  def newField() = Action {
    request =>
      gameController.newField
      Ok(views.html.field(gameController))
  }


  def new Field() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }
}
")
file:///C:/Users/ju200/Documents/HTWG/Web-App/web-app4gewinntplay/app/controllers/HomeController.scala
file:///C:/Users/ju200/Documents/HTWG/Web-App/web-app4gewinntplay/app/controllers/HomeController.scala:24: error: expected identifier; obtained new
  def new Field() = Action { implicit request: Request[AnyContent] =>
      ^
#### Short summary: 

expected identifier; obtained new