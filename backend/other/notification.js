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
  const subscription = await req.body.subscription;
  const usuario = await Usuarios.findById(req.body.id);
  var displayNotifications = usuario.displayNotifications
    ? usuario.displayNotifications
    : [];
  var exist = false;
  await displayNotifications.forEach(element => {
    if (element.keys.p256dh === subscription.keys.p256dh) {
      exist = true;
    }
  });
  if (!exist) {
    await displayNotifications.push(subscription);
    await Usuarios.findByIdAndUpdate(
      { _id: req.body.id },
      {
        displayNotifications
      }
    );
    res.send({ status: 200, msg: 'Suscripción exitosa' });
  } else {
    res.send({ status: 201, msg: 'Suscripción previamente existente' });
  }
});

router.post('/sendNotification', async (req, res) => {
  const payload = JSON.stringify({
    title: 'MercarChevere.com',
    msg: req.body.msg,
    url: req.body.url
  });
  const pushSubscription = req.body.pushSubscription;
  pushSubscription.forEach(async element => {
    try {
      await webpush.sendNotification(element, payload);
    } catch (error) {
      console.log('ERROR:' + error);
    }
  });
});

module.exports = router;
