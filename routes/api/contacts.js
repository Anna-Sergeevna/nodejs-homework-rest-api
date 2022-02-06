const express = require("express");

const { ctrlWrapper, validation, validateToken } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");
const { joiSchema, joiStatusSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", validateToken, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  validateToken,
  validation(joiSchema),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:contactId",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(joiStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
