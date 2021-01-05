export default class DashService{
  constructor(context) {
    this.context = context;
  }
  async GetDash() {
    return (await this.context.$axios.get("Dash/GetDash")).data;
  }
}