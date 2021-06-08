# Rich text custom card

This card pulls in content from a single source page located anywhere on your intranet. The card can be placed in any column and in any lane. Presentation wise, it is similar to the default Rich Text card but with enhanced features.

Most notably, it will only appear if users have permission to view the source page. So you can use ThoughtFarmer page permissions to control who can actually view the card. So build out targeted content, including quick links, or other information with source pages for various audiences.

It has the added benefit of version history which is not included as part of the default Rich Text card.

## Configuration

### Create a source page

First create a page that will hold the content that will display in the card. Add whatever content you want, keeping in mind that the destination may be in a side column. So things like tables may not display the best. Images will be dynamically resized to fit in whatever column the card is in.  

If you want the content of the card to be different then the content of the actual page then be sure to add a **Summary**. You can link to the page itself in the **Summary** to use it as a way to draw people to the page. If for some reason you want to use a Summary but do not want to show it in the card, you are still able to. Just be sure to configure the card with the **useSummary** option set to _**false**_.

If the card should only show to a certain subset of users then simply use the standard ThoughtFarmer page security feature to change the permissions accordingly. Only users with view or edit permission will see the content of the card wherever it is placed.

### Add the card to a page

On any other page, including the homepage, and in any column, you can add the **RTE Content from page** card. Be sure to click the gear icon when adding the card to a template to adjust the configuration.

The configuration options are as follows:

* **sourceId:** (required) The content id of the source page. Taken from the source page's URL.
* **showTitle**: If **true**, the title of the page will be displayed at the top of the card.
* **alternateTitle**: Use this if you want to show a heading that is not the page's title. Only works if **showTitle** is true.
* **icon**: (optional) The icon class for an icon that will appear beside the title. Leave blank to not show an icon. All icon values are the class names from the [Font Awesome 4.7](https://fontawesome.com/v4.7.0/icons/) set. 
* **useSummary**: If set to **true** it will use the page's summary content, if it exists. If **false**, it will always use the body content, even if summary content exists.
* **hideBottomBorder**: If set to **true**, this hides the border below the rich text card. The border is used to divide the rich text card and the next card. Hiding it allows the rich text card to better blend with the rest of the page content. Defaults to **false**.

Sample configuration:

```javascript
{
    "sourceId": 123,
    "showTitle": true,
    "alternateTitle": null,
    "icon": "fa-snowflake-o",
    "useSummary": true,
    "hideBottomBorder": false
}
```
