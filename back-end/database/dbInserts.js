const { pool } = require('./db.js');

const insertTitleBasics = async (tsvData) => {
    const query = `INSERT INTO TitleBasics (tconst, titleType, primaryTitle, originalTitle, isAdult, startYear, endYear,
        runtimeMinutes, genres, img_url_asset) VALUES(?,?,?,?,?,?,?,?,?,?)`
}

const insertTitleAkas = async (tsvData) => {
    const query = `INSERT INTO TitleAkas (titleId, ordering, title, region, language, types, attributes, isOriginalTitle)
    VALUES(?,?,?,?,?,?,?,?)`
}

const insertNameBasics = async (tsvData) => {
    const query = `INSERT INTO Person (nconst, primaryName, birthYear, deathYear, primaryProfession, knownForTitles, img_url_asset)
    VALUES(?,?,?,?,?,?,?)`
}

const insertTitleCrew = async (tsvData) => {
    const query = `INSERT INTO TitleCrew (tconst, directors, writers) VALUES (?,?,?)`

}

const insertTitleEpisode = async (tsvData) =>{
    const query = `INSERT INTO TitleEpisode (tconst, parentTconst, seasonNumber, episodeNumber) VALUES (?,?,?,?)`
}

insertTitlePrincipals = async (tsvData) => {
    const query = `INSERT INTO TitlePrincipal (tconst, ordering, nconst, category, job, characters, img_url_asset)
    VALUES (?,?,?,?,?,?,?)`

    const lines = tsvData.split('\n');

    const values = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const [tconst, ordering, nconst, category, job, charachters, img_url_asset] = line.split('\t');
        
        const tconstValue = tconst === '\\N' ? null : tconst;
        const orderingValue = ordering === '\\N' ? null : parseFloat(ordering);
        const nconstValue = nconst === '\\N' ? null : nconst;
        if(tconstValue && nconstValue){
        const categoryValue = category === '\\N' ? null : category;
        const jobValue = job === '\\N' ? null : job;
        const charachtersValue = charachters === '\\N' ? null : charachters.replace(/""/g, "'");
        ;
        const img_url_assetValue = img_url_asset === '\\N' ? null : img_url_asset;
        
        
        values.push([tconstValue, orderingValue, nconstValue, categoryValue, jobValue, charachtersValue, img_url_assetValue]);
        }
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        await pool.query(query, [values]);
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }



}

const insertTitleRatings = async (tsvData) => {
    const query = `INSERT INTO TitleRating (tconst, averageRating, numVotes) VALUES ?`;
    const lines = tsvData.split('\n');

    const values = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const [tconst, averageRating, numVotes] = line.split('\t');

        const tconstValue = tconst === '\\N' ? null : tconst;
        const averageRatingValue = averageRating === '\\N' ? null : parseFloat(averageRating);
        const numVotesValue = numVotes === '\\N' ? null : parseInt(numVotes, 10);
        
        if(tconstValue){
        values.push([tconstValue, averageRatingValue, numVotesValue]);
        }
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        await pool.query(query, [values]);
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};


module.exports = {insertTitleBasics, insertTitleAkas, insertNameBasics, insertTitleCrew, insertTitleEpisode, insertTitlePrincipals, insertTitleRatings}