import axios from 'axios';
import { getDAIBalance, getDAIInfo } from '../dai';

jest.mock('axios');

describe('server', () => {
  afterEach(() => {
    axios.mockClear();
  });

  describe('utils', () => {
    describe('getDAIBalance', () => {
      const address = 'MOCK_ADDRESS';

      it('should get DAI balance of address', async() => {
        const response = {
          data: {
            tokens: [{
              balance: 50,
              tokenInfo: {
                symbol: 'OTHER'
              }
            }, {
              balance: 50,
              tokenInfo: {
                symbol: 'DAI'
              }
            }]
          }
        };
        axios.get.mockResolvedValueOnce(response);

        const result = await getDAIBalance(address);

        expect(axios.get).toHaveBeenCalled();
        expect(result).toBe("50")
      });

      it('should return 0 if address is not defined', async() => {
        const result = await getDAIBalance();

        expect(result).toBe(0);
      });

      it('should return 0 if address don\'t have any token ', async() => {
        const response = { data: {} };
        axios.get.mockResolvedValueOnce(response);

        const result = await getDAIBalance(address);

        expect(result).toBe("0");
      });

      it('should return 0 if error', async() => {
        axios.get.mockRejectedValueOnce();

        const result = await getDAIBalance(address);

        expect(result).toBe(0);
      });
    });

    describe('getDAIInfo', () => {
      it('should get DAI info', async() => {
        const response = { data: {} };
        axios.get.mockResolvedValueOnce(response);

        const result = await getDAIInfo();

        expect(axios.get).toHaveBeenCalled();
        expect(result).toEqual(response.data);
      })

      it('should return empty object if error', async() => {
        axios.get.mockRejectedValueOnce();

        const result = await getDAIInfo();

        expect(axios.get).toHaveBeenCalled();
        expect(result).toEqual({
          price: {
            rate: 0
          }
        });
      })
    });
  });
});
