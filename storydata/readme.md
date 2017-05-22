

Import objects
```
cat ./storydata/try2.csv | sed 's/""/'\''"/g' | cat <(echo '"not_localized","{""stories"":[') - <(echo ']}"') | psql penguin.js -c "COPY objects(id, type, language, fields) FROM STDIN DELIMITER ';' CSV;"
```

Import global object
```
❯ cat data.json | sed 's/"/""/g' | cat <(echo '"de","{""stories"":[') - <(echo ']}"') | psql penguin.js -c 'COPY globals(language,fields) FROM STDIN (FORMAT CSV)'  
```

sed 's/"{/'\''{/g'

sed 's/}"/}'\''/g'

sed 's/""/"/g'

sed 's/"{/'\''{/g' | sed 's/}"/}'\''/g' | sed 's/""/"/g'

==========================

Better: SQL IMPORT.

http://www.convertcsv.com/csv-to-sql.htm
