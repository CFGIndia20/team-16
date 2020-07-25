import pandas as pd
from nltk.corpus import stopwords
stop = stopwords.words('english')

data= pd.read_csv('cd_categories.csv')
data["title"] = data["title"].str.lower().str.split()
data['title']= data['title'].apply(lambda x: [item for item in x if item not in stop]) //For removing stop words from the bag of words
data['new_title']= [','.join(map(str, l)) for l in data['title']]
print(data)


df1 = (data.groupby('parent_id')['new_title'] //For grouping the titles under specific category ids
       .apply(lambda x: ','.join(x)))
print(df1)
