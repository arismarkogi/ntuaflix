import pandas as pd



# Specify the output SQL file path on your local machine
output_sql_file_path = 'back-end/data/data_dump.sql'

# Person table

# Specify the path to the TSV file on your local machine
tsv_file_path = 'back-end/data/truncated_name.basics.tsv'

# Load the TSV file into a pandas DataFrame
df = pd.read_csv(tsv_file_path, sep='\t')

# Open the output SQL file in write mode
with open(output_sql_file_path, 'w') as output_file:
    # Iterate over each row in the DataFrame
    for index, row in df.iterrows():
        # Generate SQL insert statement
        insert_statement = f"""
        INSERT INTO Person (nconst, primaryName, birthYear, deathYear, primaryProfession, knownForTitles, img_url_asset)
        VALUES ("{row['nconst']}", "{row['primaryName']}", {row['birthYear']}, {row['deathYear']}, "{row['primaryProfession']}", "{row['knownForTitles']}", "{row['img_url_asset']}");
        """
        # Write the insert statement to the output SQL file
        output_file.write(insert_statement)

# TitleAkas table
tsv_file_path = 'back-end/data/truncated_title.akas.tsv' 

# Load the TSV file into a pandas DataFrame
df = pd.read_csv(tsv_file_path, sep='\t')

# Open the output SQL file in write mode
with open(output_sql_file_path, 'a') as output_file:
    # Iterate over each row in the DataFrame
    for index, row in df.iterrows():
        # Generate SQL insert statement for TitleAkas table
        insert_statement = f"""
        INSERT INTO TitleAkas (titleId, ordering, title, region, language, types, attributes, isOriginalTitle)
        VALUES ("{row['titleId']}", {row['ordering']}, "{row['title']}", "{row['region']}", "{row['language']}",
                "{row['types']}", "{row['attributes']}", {row['isOriginalTitle']});
        """
        # Write the insert statement to the output SQL file
        output_file.write(insert_statement)
        
# TitleBasics table
        
# Specify the path to the TSV file on your local machine
tsv_file_path = 'back-end/data/truncated_title.basics.tsv'  # Replace with your actual file path

# Load the TSV file into a pandas DataFrame
df = pd.read_csv(tsv_file_path, sep='\t')

# Open the output SQL file in write mode
with open(output_sql_file_path, 'a') as output_file:
    # Iterate over each row in the DataFrame
    for index, row in df.iterrows():
        # Generate SQL insert statement for TitleBasics table
        insert_statement = f"""
        INSERT INTO TitleBasics (tconst, titleType, primaryTitle, originalTitle, isAdult, startYear, endYear,
                                 runtimeMinutes, genres, img_url_asset)
        VALUES ("{row['tconst']}", "{row['titleType']}", "{row['primaryTitle']}", "{row['originalTitle']}",
                {row['isAdult']}, {row['startYear']}, {row['endYear']}, {row['runtimeMinutes']},
                "{row['genres']}", "{row['img_url_asset']}");
        """
        # Write the insert statement to the output SQL file
        output_file.write(insert_statement)
        
# TitleCrew table
        
# Specify the path to the TSV file on your local machine
tsv_file_path = 'back-end/data/truncated_title.crew.tsv'  # Replace with your actual file path

# Load the TSV file into a pandas DataFrame
df = pd.read_csv(tsv_file_path, sep='\t')

# Open the output SQL file in write mode
with open(output_sql_file_path, 'a') as output_file:
    # Iterate over each row in the DataFrame
    for index, row in df.iterrows():
        # Generate SQL insert statement for TitleCrew table
        insert_statement = f"""
        INSERT INTO TitleCrew (tconst, directors, writers)
        VALUES ("{row['tconst']}", "{row['directors']}", "{row['writers']}");
        """
        # Write the insert statement to the output SQL file
        output_file.write(insert_statement)
        
# TitleEpisode table

# Specify the path to the TSV file on your local machine
tsv_file_path = 'back-end/data/truncated_title.episode.tsv'  # Replace with your actual file path

# Load the TSV file into a pandas DataFrame
df = pd.read_csv(tsv_file_path, sep='\t')

# Open the output SQL file in write mode
with open(output_sql_file_path, 'a') as output_file:
    # Iterate over each row in the DataFrame
    for index, row in df.iterrows():
        # Generate SQL insert statement for TitleEpisode table
        insert_statement = f"""
        INSERT INTO TitleEpisode (tconst, parentTconst, seasonNumber, episodeNumber)
        VALUES ("{row['tconst']}", "{row['parentTconst']}', {row['seasonNumber']}, {row['episodeNumber']});
        """
        # Write the insert statement to the output SQL file
        output_file.write(insert_statement)
        
# TitlePrincipal table

# Specify the path to the TSV file on your local machine
tsv_file_path = 'back-end/data/truncated_title.principals.tsv'  # Replace with your actual file path

# Load the TSV file into a pandas DataFrame
df = pd.read_csv(tsv_file_path, sep='\t')


# Open the output SQL file in write mode
with open(output_sql_file_path, 'a') as output_file:
    # Iterate over each row in the DataFrame
    for index, row in df.iterrows():
        # Generate SQL insert statement for TitlePrincipal table
        insert_statement = f"""
        INSERT INTO TitlePrincipal (tconst, ordering, nconst, category, job, characters, img_url_asset)
        VALUES ("{row['tconst']}", {row['ordering']}, "{row['nconst']}", "{row['category']}", "{row['job']}",
                "{row['characters']}", "{row['img_url_asset']}");
        """
        # Write the insert statement to the output SQL file
        output_file.write(insert_statement)
        
# TitleRating table
# Specify the path to the TSV file on your local machine
tsv_file_path = 'back-end/data/truncated_title.ratings.tsv'  # Replace with your actual file path

# Load the TSV file into a pandas DataFrame
df = pd.read_csv(tsv_file_path, sep='\t')



# Open the output SQL file in write mode
with open(output_sql_file_path, 'a') as output_file:
    # Iterate over each row in the DataFrame
    for index, row in df.iterrows():
        # Generate SQL insert statement for TitleRating table
        insert_statement = f"""
        INSERT INTO TitleRating (tconst, averageRating, numVotes)
        VALUES ("{row['tconst']}", {row['averageRating']}, {row['numVotes']});
        """
        # Write the insert statement to the output SQL file
        output_file.write(insert_statement)       


print(f"SQL insert statements written to {output_sql_file_path}")
