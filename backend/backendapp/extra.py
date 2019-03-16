from sklearn import linear_model
import datetime
import numpy as np


def linear_reg(data):
    reg = linear_model.LinearRegression()

    dates = [datetime.datetime.strptime(record['time_close'][:record['time_close'].find(".")], "%Y-%m-%dT%H:%M:%S")
             for record in data]

    train_x = [(i - min(dates)).total_seconds() for i in dates]

    train_x = np.asarray([i / max(train_x) for i in train_x])

    train_y = [record['price_close'] for record in data]

    reg.fit(train_x.reshape(-1, 1), train_y)

    predict_y = reg.predict(train_x.reshape(-1, 1))

    return predict_y

