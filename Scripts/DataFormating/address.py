import sys
import math
from Models.address_mongo import AddressMongo
from Models.postgre import Postgre

sql = Postgre()
nosql = AddressMongo()

take = 100000
start_skip = 0
start_index = start_skip / take
count = sql.countAddress()

print(count)
print(count - start_skip)

for index in range(math.ceil(1 + start_index), math.ceil(count / take)):
    print(index)
    res = sql.getAddress((take * index), take)
    print(res.__len__())
    nosql.formatSaveData(res)

sql.destroy()
nosql.destroy()

if __name__ == '__main__':
    sys.exit()
