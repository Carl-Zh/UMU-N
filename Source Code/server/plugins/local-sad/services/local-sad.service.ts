import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import https from 'https';
import { HTTP_STATUS_CODE_ENUM } from '../../../core';
import { IEmployeesAndCount } from '../interfaces';

@Injectable()
export class LocalSadService {
  public client: AxiosInstance;

  constructor() {
    const {
      LOCAL_SAD_SOAG: useSoag,
      LOCAL_SAD_ISSUER: localSadIssuer,
      LOCAL_SAD_TIMEOUT: timeout,
    } = process.env;
    if (useSoag) {
      const {
        SOAG_AGENT_KEY: agentKey,
        SOAG_AGENT_CERT: agentCert,
        SOAG_AGENT_PASSPHRASE: agentPassphrase,
        SOAG_USERNAME: username,
        SOAG_PASSWORD: password,
      } = process.env;
      const auth = Buffer.from(`${username}:${password}`, 'ascii').toString('base64');
      const httpsAgent = new https.Agent({
        key: agentKey,
        cert: agentCert,
        passphrase: agentPassphrase,
        rejectUnauthorized: false,
      });
      this.client = axios.create({
        baseURL: localSadIssuer,
        headers: {
          Authorization: `Basic ${auth}`,
        },
        httpsAgent,
        timeout: Number(timeout),
      });
    } else {
      this.client = axios.create({
        baseURL: localSadIssuer,
        timeout: Number(timeout),
      });
    }
  }

  public async getEmployeesAndCount(index = 1, size = 1) {
    const response = await this.client.get<IEmployeesAndCount>(
      `/Api/Employee/GetUmuInfo?dataIdx=${index}&dataSize=${size}`,
    );
    if (response.status !== HTTP_STATUS_CODE_ENUM.OK) {
      throw new Error(response.statusText);
    }
    return response.data;
  }
}
