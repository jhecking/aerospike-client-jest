import { AerospikeWrapper } from "../../src/aerospike-client";
import { sleep } from "./util";
const as = require("aerospike");

export const testSuiteA = () => describe("Test Suite A", () => {
  afterAll(async () => {
    await sleep(1000);
  });

  it("Test Case A", async () => {
    for (let i = 0; i < 5; i++) {
      const asw = new AerospikeWrapper(
        process.env.AEROSPIKE_SERVER || "127.0.0.1",
        parseInt(process.env.AEROSPIKE_PORT) || 3000,
        process.env.AEROSPIKE_NAMESPACE || "test",
        process.env.AEROSPIKE_SET || "test"
      );
      await asw.connect();
      await asw.close(false);
      await sleep(1000);
      expect('Test').toMatch('Test')
    }
  }, 10000);
});
