CREATE LOGIN ApplicationUser WITH PASSWORD = 'Change_This_1';
GO

CREATE DATABASE PicStash;
GO

USE PicStash;
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = N'ApplicationUser')
BEGIN
    CREATE USER [ApplicationUser] FOR LOGIN [ApplicationUser]
    EXEC sp_addrolemember N'db_owner', N'ApplicationUser'
END;
GO

CREATE TABLE Users (
  ID INTEGER NOT NULL IDENTITY,
  Username VARCHAR(100),
  PasswordHash VARCHAR(255),
  CreatedAt VARCHAR(30) NOT NULL,
  PRIMARY KEY (ID)
);
GO

CREATE TABLE Posts (
  ID INTEGER NOT NULL IDENTITY,
  Title VARCHAR, 
  PathLocation TEXT NOT NULL,
  UserId INTEGER NOT NULL,
  Visible BIT NOT NULL DEFAULT 0,
  CreatedAt VARCHAR(30) NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (UserId) REFERENCES Users(ID)
);
GO

CREATE TABLE Metadata (
    ID INTEGER NOT NULL IDENTITY,
    PostId INTEGER NOT NULL,
    CameraType VARCHAR,
    PicLocation TEXT,
    PRIMARY KEY (ID),
    FOREIGN KEY (PostId) REFERENCES Posts(ID)
);
GO

CREATE TABLE Tags (
    ID INTEGER NOT NULL IDENTITY,
    PostId INTEGER NOT NULL,
    Tag TEXT,
    PRIMARY KEY (ID),
    FOREIGN KEY (PostId) REFERENCES Posts(ID)
);
GO