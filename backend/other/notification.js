const { Router } = require('express');
const router = Router();
const webpush = require('web-push');
const Usuarios = require('../models/Usuarios');

webpush.setVapidDetails(
  'mailto:mercachevere0@gmail.com',
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

//var pushSubscription = null;

router.post('/subscribe', async (req, res) => {
  console.log(req.body);
  const { id, subscribe } = await req.body;
  const usuario = await Usuarios.findById(id);
  var displayNotifications =
    usuario.displayNotifications && usuario.displayNotifications.length > 0
      ? usuario.displayNotifications
      : [];
  console.log('display', displayNotifications);
  var exist = false;
  if (displayNotifications.length > 0) {
    await displayNotifications.forEach((element) => {
      if (element.keys.p256dh === subscription.keys.p256dh) {
        exist = true;
      }
    });
  }
  if (!exist) {
    if (subscribe) {
      await displayNotifications.push(subscribe);
      await Usuarios.findOneAndUpdate(
        { _id: req.body.id },
        {
          displayNotifications,
        }
      );
      res.send({ status: 200, msg: 'Suscripción exitosa' });
    }
    res.send({ status: 401, msg: 'Suscripción nula' });
  } else {
    res.send({ status: 201, msg: 'Suscripción previamente existente' });
  }
});

router.post('/sendNotification', async (req, res) => {
  const payload = await JSON.stringify({
    title: 'MercarChevere.com',
    msg: req.body.msg,
    url: req.body.url,
  });
  const pushSubscription = await req.body.pushSubscription;
  await pushSubscription.forEach(async (element) => {
    try {
      await webpush.sendNotification(element, payload);
    } catch (error) {
      console.log('ERROR:' + error);
    }
  });
});

module.exports = router;
