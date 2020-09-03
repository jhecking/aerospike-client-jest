import {testSuiteA, testSuiteB} from '.'
import { testSuiteC } from './c-spec'

describe('sequentially run tests', () => {
    testSuiteA()
    testSuiteB()
    testSuiteC()
 })