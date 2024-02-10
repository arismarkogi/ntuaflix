const { mysql2Pool } = require('./db.js');

const executeInserts = async (query, values) => {
    const connection = await mysql2Pool.getConnection();
  
    try {
      await connection.beginTransaction();
      // Assuming `values` is an array of arrays representing multiple rows to insert
      await mysql2Pool.query(query, [values]);
  
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  };

const insertTitleBasics = async (tsvData) => {
    const query = `INSERT INTO TitleBasics (tconst, titleType, primaryTitle, originalTitle, isAdult, startYear, endYear,
        runtimeMinutes, genres, img_url_asset) VALUES ?`
    const lines = tsvData.split('\n');

    const values = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const [tconst, titleType, primaryTitle, originalTitle, isAdult, startYear, endYear, runtimeMinutes, genres, img_url_asset] = line.split('\t');

        const tconstValue = tconst === '\\N' ? null : tconst;
            
        if(tconstValue){
            const titleTypeValue = titleType === '\\N' ? null : titleType;
            const primaryTitleValue = primaryTitle === '\\N' ? null : primaryTitle;    
            const originalTitleValue = originalTitle === '\\N' ? null : originalTitle;
            const isAdultValue = isAdult === '\\N' ? null : parseInt(isAdult);
            const startYearValue = startYear === '\\N' ? null : parseInt(startYear);
            const endYearValue = endYear === '\\N' ? null : parseInt(endYear);
            const runtimeMinutesValue = runtimeMinutes === '\\N' ? null : parseInt(runtimeMinutes);
            const genresValue = genres === '\\N' ? null : genres;
            const img_url_assetValue = img_url_asset === '\\N' ? null : img_url_asset;
            values.push([tconstValue, titleTypeValue, primaryTitleValue, originalTitleValue, isAdultValue, startYearValue, endYearValue, runtimeMinutesValue, genresValue,img_url_assetValue]);
        }
    }
    executeInserts(query, values)

}

const insertTitleAkas = async (tsvData) => {
    const query = `INSERT INTO TitleAkas (titleId, ordering, title, region, language, types, attributes, isOriginalTitle) VALUES ?`
    const lines = tsvData.split('\n');

    const values = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const [titleId, ordering, title, region, language, types, attributes, isOriginalTitle] = line.split('\t');
        
        const titleIdValue = titleId === '\\N' ? null : titleId;
        
        if(titleIdValue){
            const orderingValue = ordering === '\\N' ? null : parseInt(ordering);
            const titleValue = title === '\\N' ? null : title;
            const regionValue = region === '\\N' ? null : region;
            const languageValue = language === '\\N' ? null : language;
            const typesValue = types === '\\N' ? null : types;
            const attributesValue = attributes === '\\N' ? null : attributes;
            const isOriginalTitleValue = isOriginalTitle ==='\\N' ? null : parseInt(isOriginalTitle)
            values.push([titleIdValue, orderingValue, titleValue,regionValue, languageValue, typesValue, attributesValue, isOriginalTitleValue]);
        }
    }
    executeInserts(query, values)

}

const insertNameBasics = async (tsvData) => {
    const query = `INSERT INTO Person (nconst, primaryName, birthYear, deathYear, primaryProfession, knownForTitles, img_url_asset) VALUES ?`
    const lines = tsvData.split('\n');

    const values = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const [nconst, primaryName, birthYear, deathYear, primaryProfession, knownForTitles, img_url_asset] = line.split('\t');
        
        const nconstValue = nconst === '\\N' ? null : nconst;
       
        if(nconstValue){
            const primaryNameValue = primaryName === '\\N' ? null : primaryName;
            const birthYearValue = birthYear === '\\N' ? null : parseInt(birthYear, 10);
            const deathYearValue = deathYear === '\\N' ? null : parseInt(deathYear, 10);
            const primaryProfessionValue = primaryProfession === '\\N' ? null : primaryProfession;
            const knownForTitlesValue = knownForTitles === '\\N' ? null : knownForTitles;
            const img_url_assetValue = img_url_asset === '\\N' ? null : img_url_asset;
            values.push([nconstValue, primaryNameValue, birthYearValue, deathYearValue, primaryProfessionValue,  knownForTitlesValue,  img_url_assetValue]);
        }
    }
    executeInserts(query, values)
}

const insertTitleCrew = async (tsvData) => {
    const query = `INSERT INTO TitleCrew (tconst, directors, writers) VALUES ?`

    const lines = tsvData.split('\n');

    const values = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const [tconst, directors, writers] = line.split('\t');
        
        const tconstValue = tconst === '\\N' ? null : tconst;
        
        if(tconstValue){
            const writersValue = writers === '\\N' ? null : writers;
            const directorsValue = directors === '\\N' ? null : directors;
        values.push([tconstValue, directorsValue, writersValue]);
        }
    }
    executeInserts(query, values)
}

const insertTitleEpisode = async (tsvData) =>{
    const query = `INSERT INTO TitleEpisode (tconst, parentTconst, seasonNumber, episodeNumber) VALUES ?`

    const lines = tsvData.split('\n');

    const values = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const [tconst, parentTconst, seasonNumber, episodeNumber] = line.split('\t');
        
        const tconstValue = tconst === '\\N' ? null : tconst;
        const parentTconstValue = parentTconst === '\\N' ? null : parentTconst;
        
        if(tconstValue && parentTconstValue){
            const seasonNumberValue = seasonNumber === '\\N' ? null : parseInt(seasonNumber, 10);
            const episodeNumberValue = episodeNumber === '\\N' ? null : parseInt(episodeNumber, 10);
            values.push([tconstValue, parentTconstValue, seasonNumberValue, episodeNumberValue]);
        }
    }

    executeInserts(query, values)

}

const insertTitlePrincipals = async (tsvData) => {
    const query = "INSERT INTO TitlePrincipal (tconst, ordering, nconst, category, job, characters, img_url_asset) VALUES ?"

    const lines = tsvData.split('\n');

    const values = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const [tconst, ordering, nconst, category, job, charachters, img_url_asset] = line.split('\t');
        
        const tconstValue = tconst === '\\N' ? null : tconst;
        const orderingValue = ordering === '\\N' ? null : parseInt(ordering);
        const nconstValue = nconst === '\\N' ? null : nconst;
        
        if(tconstValue && nconstValue){
            const categoryValue = category === '\\N' ? null : category;
            const jobValue = job === '\\N' ? null : job;
            const charachtersValue = charachters === '\\N' ? null : charachters.replace(/""/g, "'");
            const img_url_assetValue = img_url_asset === '\\N' ? null : img_url_asset;
            values.push([tconstValue, orderingValue, nconstValue, categoryValue, jobValue, charachtersValue, img_url_assetValue]);
        }
    }
    executeInserts(query, values)
}

const insertTitleRatings = async (tsvData) => {
    const query = `INSERT INTO TitleRating (tconst, averageRating, numVotes) VALUES ?`;
    const lines = tsvData.split('\n');

    const values = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const [tconst, averageRating, numVotes] = line.split('\t');

        const tconstValue = tconst === '\\N' ? null : tconst;
        if(tconstValue){
            const averageRatingValue = averageRating === '\\N' ? null : parseFloat(averageRating);
            const numVotesValue = numVotes === '\\N' ? null : parseInt(numVotes, 10);
            values.push([tconstValue, averageRatingValue, numVotesValue]);
        }
    }
    executeInserts(query, values)
};


module.exports = {insertTitleBasics, insertTitleAkas, insertNameBasics, insertTitleCrew, insertTitleEpisode, insertTitlePrincipals, insertTitleRatings}