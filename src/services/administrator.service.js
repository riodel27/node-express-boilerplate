class AdministratorService {
  constructor(administrator) {
    this.administrator = administrator;
  }

  async createAdministrator(data) {
    const administrator = await this.administrator.create(data);
    return administrator;
  }

  async getList() {
    const administrators = await this.administrator.find();
    return administrators;
  }
}

module.exports = AdministratorService;
