SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehicleBookings]
(
    [BookingId] [int] NOT NULL,
    [BookingDate] [datetime] NOT NULL,
    [Discount] [int] NULL,
    [TotalBillAmount] [decimal](10, 2) NULL,
    [CustomerName] [nvarchar](100) NULL,
    [MobileNo] [nvarchar](15) NULL,
    [Brand] [nvarchar](50) NULL,
    [Model] [nvarchar](50) NULL,
    [BookingUid] [nvarchar](50) NULL,
    PRIMARY KEY CLUSTERED 
(
	[BookingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
    UNIQUE NONCLUSTERED 
(
	[BookingUid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
