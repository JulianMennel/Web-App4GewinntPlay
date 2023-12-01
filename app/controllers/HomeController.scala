package controllers

import akka.actor._
import javax.inject._
import play.api.mvc._
import de.htwg.se.controller.controllerComponent._
import de.htwg.se.controller.controllerComponent.controllerBaseImpl._
import com.google.inject.Guice
import de.htwg.se.MainModule
import de.htwg.se.model.fieldComponent.FieldInterface
import de.htwg.se.model.fieldComponent.fieldBaseImpl.Field
import de.htwg.se.model.moveComponent.Move
import play.api.libs.json._
import play.api.libs.streams._

import scala.swing.Reactor

@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents, implicit val system: ActorSystem) extends BaseController {
  val injector = Guice.createInjector(new MainModule)
  val gameController = Controller(new Field())
  gameController.newField

  class VierGewinntActor(out: ActorRef) extends Actor with Reactor {
    listenTo(gameController)
    override def receive = {
      case msg: String =>
        out ! (gameController.toJson)
    }

    reactions += {
      case event: CellChanged =>
        sendJsonToClient
      case event: FieldChanged =>
        sendJsonToClient
    }

    def sendJsonToClient = {
      out ! (gameController.toJson.toString)
      println("hallo")
    }
  }

  object VierGewinntActorFactory {
    def create(out: ActorRef) = {
      Props(new VierGewinntActor(out))
    }
  }

  def socket() = WebSocket.accept[String, String] { request =>
      ActorFlow.actorRef { out => VierGewinntActorFactory.create(out) }
  }


  def newField() = Action {
    request =>
      gameController.newField
      Ok(views.html.field(gameController))
  }

  def put() = Action {
    request =>
      var row = request.body.asFormUrlEncoded.get("row").mkString.toInt
      var col = request.body.asFormUrlEncoded.get("column").mkString.toInt
      gameController.put(Some(Move('i',row,col)))
      //Ok(views.html.field(gameController))
      Ok(views.html.put(gameController))
  }

  def putJson() = Action(parse.json) {
    request =>
      request.body.validate[Map[String, String]].map {
        case dataMap =>
          val row = dataMap.getOrElse("row", "")
          val col = dataMap.getOrElse("column", "")
          gameController.put(Some(Move('i', row.toInt, col.toInt)))
          //Ok(views.html.put(gameController))
          Ok(views.html.spielfeld(gameController))
      }.recoverTotal {
          e => BadRequest(Json.obj("status" -> "error", "message" -> JsError.toJson(e)))
      }
  }

  def putGet() = Action {
    request =>
      Ok(views.html.put(gameController))
  }

  def save() = Action {
    request =>
      gameController.save
      Ok(views.html.save(gameController))
  }

  def load() = Action {
    request =>
      gameController.load
      Ok(views.html.load(gameController))
  }

  def redo() = Action {
    request =>
      gameController.redo
      Ok(views.html.redo(gameController))
  }

  def undo() = Action {
    request =>
      gameController.undo
      Ok(views.html.undo(gameController))
  }

  def about() = Action {
    Ok(views.html.about())
  }


  def startGame() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }
}
