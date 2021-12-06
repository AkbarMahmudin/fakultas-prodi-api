class FakultasProdiController {
  constructor(model) {
    this._model = model;

    this.getAllFakultasProdi = this.getAllFakultasProdi.bind(this);
    this.getAllFakultas = this.getAllFakultas.bind(this);
    this.getProdiByFakultasName = this.getProdiByFakultasName.bind(this);
    this.getAllProdi = this.getAllProdi.bind(this);
    this.getProdiByKode = this.getProdiByKode.bind(this);
  }

  async getAllFakultasProdi(req, res) {
    const fakultas = await this._model.getFakultas();
    const prodi = await this._model.getProdi();

    const listFakultas = fakultas.map((f) => ({
      namaFakultas: f.fakultas,
      listProdi: prodi
        .filter((p) => p.fakultas === f.fakultas)
        .map((p) => ({
          kode: p.kode,
          prodi: p.prodi,
        })),
    }));

    res.json({
      status: 'sukses',
      data: {
        universitas: 'Universitas Pendidikan Indonesia',
        listFakultas,
      },
    });
  }

  async getAllFakultas(req, res) {
    const results = await this._model.getFakultas();
    const data = results.map((result) => ({ namaFakultas: result.fakultas }));

    res.json({
      status: 'sukses',
      data,
    });
  }

  async getProdiByFakultasName(req, res) {
    try {
      const { namaFakultas } = req.params;
      const results = await this._model.getProdiByFakultas(namaFakultas);
      const listProdi = results.map((result) => ({
        kodeProdi: result.kode,
        namaProdi: result.prodi,
      }));

      res.json({
        status: 'sukses',
        data: {
          namaFakultas,
          listProdi,
        },
      });
    } catch (error) {
      res.status(error.statusCode);
      res.json({
        errors: [
          {
            status: 'gagal',
            title: error.message,
            detail: 'Prodi dari fakultas bersangkutan tidak ditemukan',
          },
        ],
      });
    }
  }

  async getAllProdi(req, res) {
    const prodi = await this._model.getProdi();

    res.json({
      status: 'sukses',
      data: prodi.map((d) => ({
        kode: d.kode,
        prodi: d.prodi,
      })),
    });
  }

  async getProdiByKode(req, res) {
    try {
      const { kodeProdi } = req.params;
      const data = await this._model.getProdi(kodeProdi);

      res.json({
        status: 'sukses',
        data: data[0],
      });
    } catch (error) {
      res.status(error.statusCode);
      res.json({
        errors: [
          {
            status: 'gagal',
            title: error.message,
            detail: 'Kode prodi tidak ditemukan',
          },
        ],
      });
    }
  }
}

module.exports = FakultasProdiController;
