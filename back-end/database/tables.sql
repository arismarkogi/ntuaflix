CREATE DATABASE ntuaflix_db;
USE ntuaflix_db;

CREATE TABLE Person (
    nconst VARCHAR(50) PRIMARY KEY,
    primaryName VARCHAR(255),
    birthYear INT,
    deathYear INT,
    primaryProfession VARCHAR(255),
    knownForTitles VARCHAR(255),
    img_url_asset VARCHAR(500)
);

CREATE TABLE TitleAkas (
    titleId VARCHAR(50),
    ordering INT,
    title VARCHAR(255),
    region VARCHAR(10),
    language VARCHAR(10),
    types VARCHAR(50),
    attributes VARCHAR(50),
    isOriginalTitle BOOLEAN,
    PRIMARY KEY (titleId, ordering)

);

CREATE TABLE TitleBasics (
    tconst VARCHAR(50) PRIMARY KEY,
    titleType VARCHAR(20),
    primaryTitle VARCHAR(255),
    originalTitle VARCHAR(255),
    isAdult BOOLEAN,
    startYear INT,
    endYear INT,
    runtimeMinutes INT,
    genres VARCHAR(255),
    img_url_asset VARCHAR(500)
);

CREATE TABLE TitleCrew (
    tconst VARCHAR(50) PRIMARY KEY,
    directors VARCHAR(255),
    writers VARCHAR(255),
    FOREIGN KEY (tconst) REFERENCES TitleBasics(tconst)
);

CREATE TABLE TitleEpisode (
    tconst VARCHAR(50),
    parentTconst VARCHAR(50),
    seasonNumber INT,
    episodeNumber INT,
    PRIMARY KEY (tconst, parentTconst),
    FOREIGN KEY (tconst) REFERENCES TitleBasics(tconst),
    FOREIGN KEY (parentTconst) REFERENCES TitleBasics(tconst)
);


CREATE TABLE TitlePrincipal (
    tconst VARCHAR(50),
    ordering INT,
    nconst VARCHAR(50),
    category VARCHAR(255),
    job VARCHAR(255),
    characters VARCHAR(255),
    img_url_asset VARCHAR(500),
    PRIMARY KEY (tconst, ordering, nconst),
    FOREIGN KEY (tconst) REFERENCES TitleBasics(tconst),
    FOREIGN KEY (nconst) REFERENCES Person(nconst)
);

CREATE TABLE TitleRating (
    tconst VARCHAR(50) PRIMARY KEY,
    averageRating FLOAT,
    numVotes INT,
    FOREIGN KEY (tconst) REFERENCES TitleBasics(tconst)
);
