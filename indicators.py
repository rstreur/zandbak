def getVwap(ohlcv):
    # Calculate the VWAP for each interval
    vwap = ohlcv.apply(lambda x:
                       (x['close'] * x['volume']).sum() / x['volume'].sum())
    print('Bitcoin VWAP:', vwap)
    # Calculate the weighted average VWAP for the 24-hour period
    weighted_vwap = (vwap * ohlcv['volume'].sum()) / vwap.sum()

    print('Bitcoin Weighted VWAP for the last 24 hours:', weighted_vwap)
    return {'vwap': vwap, 'weighted_vwap': weighted_vwap}