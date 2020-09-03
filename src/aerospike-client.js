const Aerospike = require("aerospike");

const DEFAULT_WRITE_POLICY = new Aerospike.policy.WritePolicy({
  exists: Aerospike.policy.exists.CREATE_OR_REPLACE,
  key: Aerospike.policy.key.SEND,
  totalTimeout: 10000,
  socketTimeout: 10000,
  maxRetries: 5,
});

export class AerospikeWrapper {
  namespace;
  set;
  client;

  constructor(server, port, namespace, set) {
    this.namespace = namespace;
    this.set = set;
    this.client = Aerospike.client({
      hosts: [{ addr: server, port }],
    });
  }

  async connect() {
    await this.client.connect();
  }

  async close(releaseEventLoop = true) {
    await this.client.close(releaseEventLoop);
  }

  asKey(key) {
    return new Aerospike.Key(this.namespace, this.set, key);
  }

  put(key, value) {
    return this.client.put(
      this.asKey(key),
      { value },
      { ttl: 1000 },
      DEFAULT_WRITE_POLICY
    );
  }

  get(key) {
    return this.client.get(this.asKey(key));
  }

  remove(key) {
    return this.client.remove(this.asKey(key));
  }
}
