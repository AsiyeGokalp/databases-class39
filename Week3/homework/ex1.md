1. dinner_date,food_code and food_description violate 1NF

2. member info, dinner info , venue info, food info, member dinner, member venue

3.

member info
+-----------+-------------+----------------+
| member_id | member_name | member_address |
+-----------+-------------+----------------+

venue info
+------------+-------------------+
| venue_code | venue_description |
+------------+-------------------+

dinner info
+-----------+-----------+
| dinner_id | food_code |
+-----------+-----------+

food info
+-----------+------------------+
| food_code | food_description |
+-----------+------------------+

member dinner
+-----+-----------+-----------+
| id | member_id | dinner_id |
+-----+-----------+-----------+

member venue
+-----+-----------+------------+
| id | member_id | venue_code |
+-----+-----------+------------+
