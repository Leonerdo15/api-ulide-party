select * from spots
inner join users_spots_tags on spots.id = users_spots_tags.spot_id
inner join tags on users_spots_tags.tag_id = tags.id
where tags.name = 'esplanada'