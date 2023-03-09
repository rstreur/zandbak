# Phemex modules
import config
import ccxt

exchange = None

def initExchange():
    global exchange
    try:
        if exchange == None:
            exchange = ccxt.phemex({
                'enableRateLimit': True,  # https://github.com/ccxt/ccxt/wiki/Manual#rate-limit
                'apiKey': config.API_KEY_ZIGGO,  # testnet keys if using the testnet sandbox
                'secret': config.API_SECRET_ZIGGO,  # testnet keys if using the testnet sandbox
                'options': {
                    'defaultType': 'swap',
                },
            })
            exchange.load_markets()
            # phemex.set_sandbox_mode(True)  # uncomment to use the testnet sandbox
            # phemex.set_leverage(config.LEVERAGE,config.ORDER_SYMBOL_BTC)
            print('{} exchange is connected!'.format(exchange))
        return exchange
    except Exception as e:
        print("initExchange failed, retrying",e)


def getPositionInfo():
    global exchange
    try:
        if exchange == None:
            print('Init exchange')
            exchange = initExchange()
        params={"type":"swap","code":"BTC"}
        balance = exchange.fetch_balance(params=params)
        positions = balance.get('info').get('data').get('positions')
        # print(positions)
        leverage = round(float(positions[0]['leverage']),0)
        amount = float(positions[0]['size'])
        entryPrice = round(float(positions[0]['avgEntryPrice']),0)
        side = positions[0]['side']
        symbol = positions[0]['symbol']
        # print(positions[0])
        position_pnl_pct = 0
        unrealized_pnl = 0
        if side != 'None':
            unrealized_pnl = (float(positions[0]['markPrice']) - float(positions[0]['avgEntryPrice'])) * float(positions[0]['size'])
            position_value = float(positions[0]['size']) * float(positions[0]['avgEntryPrice'])
            # print(f'unrealized_pnl: {unrealized_pnl} position_value: {position_value}')
            position_pnl_pct = unrealized_pnl / position_value * 10000
        # print(f"Position {positions[0]['symbol']}: PNL {position_pnl_pct:.2f}%")
        return [{'entryPrice':entryPrice,'side':side,'amount':amount,'symbol':symbol, 'leverage': leverage,'unrealized_pnl':unrealized_pnl, 'unrealized_pnl_perc': position_pnl_pct}]
    except Exception as e:
        print("request getPositionInfo failed, retrying",e)