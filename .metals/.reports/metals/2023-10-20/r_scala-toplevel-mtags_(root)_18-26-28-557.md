id: file:///C:/Users/ju200/Documents/HTWG/Web-App/web-app4gewinntplay/app/controllers/HomeController.scala:[1229..1232) in Input.VirtualFile("file:///C:/Users/ju200/Documents/HTWG/Web-App/web-app4gewinntplay/app/controllers/HomeController.scala", "package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import de.htwg.se.controller.controllerComponent.controllerBaseImpl.Controller
import com.google.inject.Guice
import de.htwg.se.MainModule
import de.htwg.se.model.fieldComponent.FieldInterface
import de.htwg.se.model.moveComponent.Move

@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  val injector = Guice.createInjector(new MainModule)
  val gameController = Controller(injector.getInstance(classOf[FieldInterface]))
  gameController.newField
  

  def newField() = Action {
    request =>
      gameController.newField
      Ok(views.html.field(gameController))
  }

  def put() = Action {
    request =>
      var row = request.body.asFormUrlEncoded.get("row").mkString.toInt
      var col = request.body.asFormUrlEncoded.get("column").mkString.toInt
      var player = if (gameController.field.player.toString == "true") "X" else "O"
      var feldStr = row+","+col
      gameController.put(Some(Move('i',row,col)))
      //Ok(views.html.field(gameController))
      Ok(views.html.put(gameController, feldStr, player))
  }

  def 


  def startGame() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }
}
")
file:///C:/Users/ju200/Documents/HTWG/Web-App/web-app4gewinntplay/app/controllers/HomeController.scala
file:///C:/Users/ju200/Documents/HTWG/Web-App/web-app4gewinntplay/app/controllers/HomeController.scala:39: error: expected identifier; obtained def
  def startGame() = Action { implicit request: Request[AnyContent] =>
  ^
#### Short summary: 

expected identifier; obtained def