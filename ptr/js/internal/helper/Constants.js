/*
 * Color definitions
 */
const defaultBackgroundColor = "#343a40";
const defaultFontColor = "#f8f9fa";
const defaultAxisColor = "#828282";
const lightColor = "#eeeeee";
const mediumColor = "#999999";
const darkColor = "#343a40";
const gridLineColor = "#616c77";
const fontSize = "1.1rem";

/*
 * Chart definitions
 */
const fontWeightBold = "bold";
const legendTitleTextDps = "Increase in %";
const tooltipHeaderFormat = "<b>(point.x)</b>";
const tooltipPointFormat = '<span style=color: "{point.color}"><b>{series.name}</b></span>: <b>{point.y}</b><br/>';
const plotOptionsPointFormat = "Value: {point.y:,.0f} mm";
const alignRight = "right";
const alignMiddle = "middle";
const stackingNormal = "normal";
const legendTitleTextSteps = "Steps";
const chartType = "bar";
const defaultHeader = "Ancient Madness - Trinkets - Venthyr - Composite";
const whiteText = "white";
const legendLayoutVertical = "vertical";
const legendTitleTextItemLevel = "Item Level";
const increase = "% (Increase)";
const decrease = "% (Decrease)";
const dpsIncrease = "Increase in %";
/*
 * Other definitions
 */
const updateDataInnerHtml = "Last Updated: ";
const divText = "div";
const buttonContainerText = "button-container";
const buttonText = "button";
const dash = "-";
const space = " ";
const DPS = "DPS";
const px = "px";
const empty = "";
const jsonExtension = ".json";
const csvExtension = ".csv"
const simResultPath = "/results/Results_";
const slash = "/";
const underscore = "_";

/*
 * Repo url definition
 */
const baseUrl = "https://raw.githubusercontent.com/WarcraftPriests/sl-shadow-priest/ptr/";
const wowheadUrl = "https://www.wowhead.com/"
const wowheadSpellPath = "spell="
const wowheadItemPath = "item="
const config = "config.yml";
const textType = "text";

/*
 * Json data schema definitions
 */
const jsonLastUpdated = "last_updated";
const jsonSortedDataKeys = "sorted_data_keys";
const jsonIds = "ids";
const jsonData = "data";
const jsonDPS = "DPS";
const jsonBase = "Base";
const jsonSimulatedSteps = "simulated_steps";


/*
 * Simc related stuff definitions
 */
const trinkets = "trinkets";
const talents = "talents";
const soulbinds = "soulbinds";
const composite = "Composite";
const legendaries = "legendaries";
const fightStyle = "fightStyle";
const covenant = "covenant";
const conduits = "conduits";
const racials = "racials";
const ancientMadness = "am";
const venthyr = "venthyr";
const kyrian = "kyrian";
const nightFae = "night_fae";
const necrolord = "necrolord";
const ring = "ring";
const food = "food";
const sims = "sims";
const apl = "apl";
const gear = "gear";
const stats = "stats";
const soulbindTraits = "soulbind_traits";
const soulbindsLaunch = "soulbinds_launch";
const conduitCombos = "conduit_combos";
const legendaryCombos = "legendary_combos";
const legendaryItems = "legendary_items";
const trinketCombos = "trinket_combos";

/*
 * Button related definitions
 */
const fightStyleDiv = "fightStyle-div";
const covenantDiv = "covenant-div";
const covenantChoiceDiv = "covenantChoice-div";
const consumablesDiv = "consumables-div";
const shardsDiv = "shards-div";
const enchantDiv = "enchants-div";
const talentDiv = "talent-div"
const simsDiv = "sims-div";
const buttonName = "button";
const buttonId = "id";
const buttonClass = "class";
const onClick = "onClick";
const click = "click";
const handleOnClickText = "handleOnClick('";
const show = "show";
const enchants = "enchants";
const consumables = "consumables";
const shards = "shards_of_domination";
const covenants = "covenants";
const covenantsChoice = "covenant_choice";
const weights = "weights";
const maxSimButtonsPerRow = 7;

const pointer = "pointer";
const attributeSpacer = "', '";
const attributeClose = "')";
const span = "span";
const classLabel = "class";
const divider = "divider";
const fivePixel = "5px";
const auto = "auto";
const inlineBlock = "inline-block";

const defaultTalent = ancientMadness
const defaultSims = trinkets;
const defaultCovenant = venthyr;
const defaultCovenantChoice = "aggregateCovenant";
const defaultEnchant = ring;
const defaultConsumable = food;
const defaultFightStyle = composite;
const coventantsChoiceChartName = "Covenant Choice - Aggregate"

const builds = "builds";
const files = "files";
const none = "none";