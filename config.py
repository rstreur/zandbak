API_KEY_HOTSPOT='90f26ba9-ee35-4771-a3fe-89f55e0b6b49'
API_SECRET_HOTSPOT='tN7fxvPycLpIFMBN8Ys5Sm05gTY5OeCT2i_7IMRIomM4ZjkxZjQwNy03MjYyLTQzMjktOTEyMC01YjNlYTcwYzY1MTM'
API_KEY_BASTION_ROTTERDAM='939564bc-43ce-423b-992b-3ab8ed6a337c'
API_SECRET_BASTION_ROTTERDAM='s2xI96TWW1MeGCGdH2ej3i5E0-h9pARrMRRLd_Df6nI5MDU4NzgzMi0yZGQ0LTQ3NTctOGFkMy0xODJjMGNmMTA0ZjM'
API_KEY='72f791c0-17d9-44cf-b252-857c5a140b5d'
API_SECRET='D3K5kV0Pw9zjgbfomvVMN7zGZALqWlc8DKeFa2N6TkcxNzM4NmNlOS1hZWVkLTRiZjUtYTNhMC0xMDI5YjgzZWJjYTU'
API_KEY_SUB='d6953855-12ba-4001-b3c5-9f5cafdb0979'
API_SECRET_SUB='cFXGdXpYxIg1uZaWm7BdFHHJWiK2YjvAmAwZAXwEqY9mYTZmMGZiOC1mYjUyLTQ5MmItOGYwNS1iZDdjM2YwYzExMTI'
API_KEY_TESTNET='a988b16d-4f10-4b26-906c-fc0b3119da24'
API_SECRET_TESTNET='rmadpGkokmiglfKTEN9ETmnRvy_5cDLvia-TqQ0uGlk2Y2ZjZGUyMi1iMTg1LTQ4YjctYmM5Yy0wYTk3MDhlMzllMjc'
API_KEY_MAMS='133d2055-7b5a-481c-a799-e63f0a525519'
API_SECRET_MAMS='us4A-nLn0IceUYOuF6YQF2Xs_VA8Q_K96YtvPE-QGR83YTcxMDE0NS00NjFlLTQzNzgtOTRjNy1mMTFkZTU5MGEwOTM'
API_KEY_BASTION_UTRECHT='a6ecbb20-e93e-410d-8ee3-6302f1ec5365'
API_SECRET_BASTION_UTRECHT='CgEUtZs8uZ_lCzUUWNPpCvimaIe7JrjHg-6XdPYd6_M1YzIwOTU4MC1lOGFjLTRhY2YtYWNlZi1kMjFiMDk2NmVlOTk'
API_KEY_ZIGGO='cad75bf3-9840-435f-aa5e-72e9efe3a60b'
API_SECRET_ZIGGO='H2EH55D_QpzrivZAJB62btPbKcCet4TsD6vdDSadgLBlNzhlY2Q0ZS1hY2QxLTQ3NWItOTZmYi02ZmYxYjQ1Njc2ZjA'
API_KEY_ORSEL='f27a56f7-cfb3-4ec5-b825-568df8e4809e'
API_SECRET_ORSEL='rooNCCiXamyVrTjKY5R8QxdYW7tZD4u_ury-ZlWUxUA3ZWVjMTNkMy01Yjc1LTQwNWMtOGMxOC0wMDVmZWViMThkZGE'

EXCHANGE='PHEMEX'
SCREENER='crypto'
TA_SYMBOL='BTCUSDPERP'
TEST=True
# asset position
INDEX_POS=1
# time between trades
PAUSE_TIME=60
# for volume calc VOL_REPEAT * VOL_TIME == TIME of volume collection
VOL_REPEAT=11
VOL_TIME=5
PARAMS = {'type':'swap','code':'USD','timeInforce':'PostOnly'}
PARAMS_BTC = {'type':'swap','code':'BTC','timeInforce':'PostOnly'}
TARGET = 10
MAX_LOSS = -15
VOL_DECIMAL = .4
# for df
SYMBOL='BTC/USD'
TRADE_SYMBOL='uBTCUSD'
TRADE_SYMBOL_BTCUSD='BTCUSD'
MBTC_SYMBOL='.MBTC'
MIN_PERC=15
POS_SIZE = 15
LEVERAGE= 10
TIMEFRAME='1m'
LIMIT=1500
SMA=20

# gridbot settings
POSITION_SIZE = 1
ORDER_SYMBOL='BTC/USD:USD'
ORDER_SYMBOL_BTC='BTC/USD:BTC'
NUM_BUY_GRID_LINES = 1
NUM_SELL_GRID_LINES = 1
GRID_SIZE = 30

CHECK_ORDERS_FREQUENCY = 1
CLOSED_ORDER_STATUS = 'closed'

### Strategy parameters
MARKET_MOVE = 'long'
TRADE_CANDLE_COUNT = 9
TAKE_PROFIT = -35
TAKE_PROFIT_TRAIL = 3

# Database settings
DB_HOST="127.0.0.1"
DB_DATABASE="dbont"
DB_USER="root"
DB_PASSWORD="Ryan28130!@#"
DB_KEEP_ALIVE=True # try and reconnect timedout mysql connections?

# Harmonic settings
MAIN_SYMBOLS = ['BTC/USDT', 'ETH/USDT', 'BCH/USDT', 'ETC/USDT', 'ADA/USDT','XRP/USDT', 'DOT/USDT', 'EOS/USDT', 'LTC/USDT']
ALT_SYMBOLS = ['UNI/USDT', 'XMR/USDT', 'ATOM/USDT', 'COMP/USDT', 'SOL/USDT', 'ALGO/USDT', 'FIL/USDT', 'XLM/USDT', 'AAVE/USDT']
PERIODS = ['30m', '1h', '4h']
ERROR_RATE = 0.05


PROCESS_COUNT=4

PREDICT=False