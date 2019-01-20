
campaign.find({}, function(err, allcampaigns) {
    
    allcampaigns.forEach(function(campaignInstance) {
       // @shritesh do you function here




       // Use native JSON.stringify method. Works with nested objects and all major browsers support this method.

        // str = JSON.stringify(campaignInstance);
        // str = JSON.stringify(campaignInstance, null, 4); // (Optional) beautiful indented output.
        // console.log(str);
    });
}
)
