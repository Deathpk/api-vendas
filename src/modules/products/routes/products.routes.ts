import { Router } from 'express';
import ProductsController from '@modules/products/controller/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';
const router = Router();
const controller = new ProductsController();

router.get('/', controller.index);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  controller.show,
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(120).required(),
      price: Joi.number().required(),
      quantity: Joi.number().min(1).required(),
    },
  }),
  controller.create,
);

router.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(3).max(120).required(),
      price: Joi.number().required(),
      quantity: Joi.number().min(1).required(),
    },
  }),
  controller.update,
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  controller.delete,
);

export default router;
