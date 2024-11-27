import '@testing-library/jest-dom'
import * as jestExtendedMatchers from 'jest-extended';

import {expect} from 'vitest';

expect.extend(jestExtendedMatchers);