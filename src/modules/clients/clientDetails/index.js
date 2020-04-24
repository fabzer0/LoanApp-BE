const { Router } = require('express')
const ClientDetailsController = require('./controller')

const questionnaireRouter = Router()

questionnaireRouter.post(
  '/questionnaire-step-1',
  ClientDetailsController.fillStepOneDetails
)

questionnaireRouter.put(
  '/questionnaire-step-2',
  ClientDetailsController.fillStepTwoDetails
)

questionnaireRouter.put(
  '/questionnaire-step-3',
  ClientDetailsController.fillStepThreeDetails
)

questionnaireRouter.get(
  '/client/profile',
  ClientDetailsController.getClientDetails
)

module.exports = questionnaireRouter
