const { Pool } = require('pg');
const NotFoundError = require('../exceptions/NotFoundError');

class FakultasProdi {
  constructor() {
    this._pool = new Pool({ ssl: true });
  }

  async getFakultas() {
    const result = await this._pool.query('SELECT DISTINCT fakultas FROM fakultas_prodi ORDER BY fakultas');

    return result.rows;
  }

  async getProdiByFakultas(fakultasName) {
    const sql = {
      text: 'SELECT kode, prodi FROM fakultas_prodi WHERE fakultas = $1',
      values: [fakultasName],
    }
    const result = await this._pool.query(sql);

    if (!result.rowCount) {
      throw new NotFoundError('Tidak ditemukan');
    }

    return result.rows;
  }

  async getProdi(kodeProdi) {
    let sql = {
      text: 'SELECT * from fakultas_prodi WHERE kode = $1',
      values: [kodeProdi],
    };
    
    if (!kodeProdi) {
      sql = 'SELECT * FROM fakultas_prodi';
    }

    const result = await this._pool.query(sql);

    if (!result.rowCount) {
      throw new NotFoundError('Tidak ditemukan');
    }
    
    return result.rows;
  }
}

module.exports = FakultasProdi;
