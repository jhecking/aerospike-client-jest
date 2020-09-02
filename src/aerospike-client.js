const Aerospike = require("aerospike");

const DEFAULT_WRITE_POLICY = new Aerospike.policy.WritePolicy({
  exists: Aerospike.policy.exists.CREATE_OR_REPLACE,
  key: Aerospike.policy.key.SEND,
  totalTimeout: 10000,
  socketTimeout: 10000,
  maxRetries: 5,
});

export class AerospikeWrapper {
  namespace: string;
  set: string;
  client: Aerospike.Client;

  constructor(server: string, port: Number, namespace: string, set: string) {
    this.namespace = namespace;
    this.set = set;
    this.client = Aerospike.client({
      hosts: [{ addr: server, port }],
    });
    console.log(this.client);
  }

  async connect() {
    await this.client.connect();
  }

  async close(releaseEventLoop: boolean = true) {
    await this.client.close(releaseEventLoop);
  }

  asKey(key: string) {
    return new Aerospike.Key(this.namespace, this.set, key);
  }

  put(key: string, value: any) {
    return this.client.put(
      this.asKey(key),
      { value },
      { ttl: 1000 },
      DEFAULT_WRITE_POLICY
    );
  }

  get(key: string) {
    return this.client.get(this.asKey(key));
  }

  remove(key: string) {
    return this.client.remove(this.asKey(key));
  }
}
