const express = require('express');
const router = express.Router();

const FakultasProdi = require('../model/FakultasProdi');
const FakultasProdiController = require('../controller/FakultasProdiController');

const fakultasProdi = new FakultasProdi();
const fakultasProdiController = new FakultasProdiController(fakultasProdi);

router.get('/fakultas-prodi', fakultasProdiController.getAllFakultasProdi);
router.get('/fakultas', fakultasProdiController.getAllFakultas);
router.get('/fakultas/:namaFakultas/prodi', fakultasProdiController.getProdiByFakultasName);
router.get('/prodi', fakultasProdiController.getAllProdi);
router.get('/prodi/:kodeProdi', fakultasProdiController.getProdiByKode);

module.exports = router;
