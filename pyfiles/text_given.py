import re
import math
import sys
q = ""   
universalSetOfUniqueWords = []
matchPercentage = 0
##########################################################################
fd = sys.argv[1]
lowercaseQuery = fd.lower()
queryWordList = re.sub("[^\w]", " ",lowercaseQuery).split()
queryWordList = list(map(str, queryWordList))
for word in queryWordList:
      if word not in universalSetOfUniqueWords:
              universalSetOfUniqueWords.append(word)
##########################################################################
fd = sys.argv[2]
database1 = fd.lower()

databaseWordList = re.sub("[^\w]", " ",database1).split()
databaseWordList = list(map(str, databaseWordList))


for word in databaseWordList:
      if word not in universalSetOfUniqueWords:
              universalSetOfUniqueWords.append(word)

##########################################################################
queryTF = []
databaseTF = []

for word in universalSetOfUniqueWords:
      queryTfCounter = 0
      databaseTfCounter = 0

      for word2 in queryWordList:
              if word == word2:
                      queryTfCounter += 1
      queryTF.append(queryTfCounter)

      for word2 in databaseWordList:
              if word == word2:
                      databaseTfCounter += 1
      databaseTF.append(databaseTfCounter)

dotProduct = 0
for i in range (len(queryTF)):
      dotProduct += queryTF[i]*databaseTF[i]

queryVectorMagnitude = 0
for i in range (len(queryTF)):
      queryVectorMagnitude += queryTF[i]**2
queryVectorMagnitude = math.sqrt(queryVectorMagnitude)

databaseVectorMagnitude = 0
for i in range (len(databaseTF)):
      databaseVectorMagnitude += databaseTF[i]**2
databaseVectorMagnitude = math.sqrt(databaseVectorMagnitude)

matchPercentage = (float)(dotProduct / (queryVectorMagnitude * databaseVectorMagnitude))*100

#print(queryWordList)
#print()
#print(databaseWordList)

#print(queryTF)
#print()
#print(databaseTF)

output = matchPercentage

print(output)
