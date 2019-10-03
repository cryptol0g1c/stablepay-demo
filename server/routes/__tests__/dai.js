import web3 from 'web3';
import { getDAIBalance, getDAIInfo } from '../../utils/dai';
import { handlers } from '../dai';
import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';

jest.mock('web3');
jest.mock('../../utils/dai');

const address = 'MOCK_ADDRESS';
const DAIBalance = {};
const TokenInfo = {};

describe('server', () => {
  beforeEach(() => {
    getDAIBalance.mockClear();
    getDAIInfo.mockClear();
  });

  describe('routes', () => {
    describe('GET /balance/:address', () => {
      it('should return DAI balance and token info', async() => {
        getDAIBalance.mockResolvedValueOnce(DAIBalance);
        getDAIInfo.mockResolvedValueOnce(TokenInfo);
        web3.utils.isAddress.mockReturnValueOnce(true);

        const req = new Request();
        const res = new Response();

        req.setParams({ address });
        await handlers.get(req, res);

        expect(res.json).toHaveBeenCalledWith({
          success: true,
          DAIBalance,
          TokenInfo
        });
        expect(getDAIBalance).toHaveBeenCalledWith(address);
        expect(getDAIInfo).toHaveBeenCalled();
      });

      it('should return error if address is missing', async() => {
        const req = new Request();
        const res = new Response();

        await handlers.get(req, res);

        expect(res.json).toHaveBeenCalledWith({
          success: false,
          msg: 'Address Missing'
        });
      });

      it('should return error if address is incorrect', async() => {
        web3.utils.isAddress.mockReturnValueOnce(false);

        const req = new Request();
        const res = new Response();

        req.setParams({ address });
        await handlers.get(req, res);

        expect(res.json).toHaveBeenCalledWith({
          success: false,
          msg: 'Wrong address format'
        });
      });

      it('should catch errors', async() => {
        getDAIBalance.mockRejectedValueOnce();
        web3.utils.isAddress.mockReturnValueOnce(true);

        const req = new Request();
        const res = new Response();

        req.setParams({ address });
        await handlers.get(req, res);

        expect(res.json).toHaveBeenCalledWith({
          success: false,
          msg: 'Error getting token information or address balance'
        });
      });
    });
  });
});
