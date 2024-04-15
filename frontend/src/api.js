import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = JoblyApi.token ? { Authorization: `Bearer ${JoblyApi.token}` } : {};
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`, {}, "get");
    return res.user;
  }

  static async updateUser(username, userData) {
    try {
      let res = await this.request(`users/${username}`, userData, "patch");
      return res.user;
    } catch (error) {
      throw error;
    }
  }

  static async applyForJob(username, jobId) {
    try {
      let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
      return res.applied; // Return the ID of the applied job
    } catch (error) {
      throw error;
    }
  }

  static async signup(userData) {
    try {
      let res = await this.request("auth/register", userData, "post");
      return res.token;
    } catch (error) {
      throw error;
    }
  }

  static async login(username, password) {
    try {
      let res = await this.request("auth/token", { username, password }, "post");
      return res.token;
    } catch (error) {
      throw error;
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(searchTerm = '') {
    const params = searchTerm ? { name: searchTerm } : {};
    let res = await this.request(`companies`, params);
    return res.companies;
  }

  static async getJobs(searchTerm) {
    const params = searchTerm ? { title: searchTerm } : {};
    let res = await this.request(`jobs`, params);
    return res.jobs;
  }

}



export default JoblyApi;