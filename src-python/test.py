def hello():
    x = [i for i in range(4)]
    for i in x:
        yield i
x = hello()
for i in x:
    print(i, end=" ")