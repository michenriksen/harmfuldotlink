var App = App || {}

App.flowChart = {
  nodes: {
    inSearchResult: {
      text: "Is it a search result?",
      style: "",
      yes: "somethingNaughty",
      no: null
    },
    inEmail: {
      text: "Is it a link in an email?",
      style: "",
      yes: "foreignPrince",
      no: null
    },
    inAd: {
      text: "Is it an ad?",
      style: "",
      yes: "claimSinglesInArea",
      no: null
    },
    inSocialFeed: {
      text: "Is it on your social feed?",
      style: "",
      yes: "promiseGoodLuck",
      no: null
    },
    somethingNaughty: {
      text: "Are you searching for something naughty?",
      yes: "beenThereBefore",
      no: "beenThereBefore"
    },
    beenThereBefore: {
      text: "Have you been on the site before?",
      yes: "hoverOverUrl",
      no: "searchingForSomethingFree"
    },
    hoverOverUrl: {
      text: "Hover over the URL. Is it correct?",
      yes: "clickThatLink",
      no: "dontClickThatLink"
    },
    searchingForSomethingFree: {
      text: "Are you searching for something free?",
      yes: "hoverOverUrl",
      no: "lookLegit"
    },
    lookLegit: {
      text: "Does it look legit?",
      yes: "badGrammar",
      no: "dontClickThatLink",
    },
    badGrammar: {
      text: "Does it have bad grammar, mispellings, blurry images, generic intros or personal info requests?",
      yes: "dontClickThatLink",
      no: "hoverOverUrl"
    },
    foreignPrince: {
      text: "Is it from a foreign prince?",
      yes: "areYouRelated",
      no: "someoneYouKnow"
    },
    areYouRelated: {
      text: "Are you related to said royalty?",
      yes: "clickThatLink",
      no: "dontClickThatLink"
    },
    someoneYouKnow: {
      text: "Is it from someone you know or a service you use?",
      yes: "normalToEmail",
      no: "miraculouslyRestore"
    },
    normalToEmail: {
      text: "Is it normal for them to email you something like that?",
      yes: "lookLegit",
      no: "whoTheySayTheyAre"
    },
    miraculouslyRestore: {
      text: "Does it claim to miraculously restore your luscious locks?",
      yes: "dontClickThatLink",
      no: "whoTheySayTheyAre"
    },
    whoTheySayTheyAre: {
      text: "Are they really who they say they are?",
      yes: "doubleCheckEmail",
      no: "dontClickThatLink"
    },
    doubleCheckEmail: {
      text: "Double check the email address. Is it right?",
      yes: "lookLegit",
      no: "dontClickThatLink"
    },
    claimSinglesInArea: {
      text: "Does it claim there are singles in your area?",
      yes: "areYouSingle",
      no: "ClaimWonPrize"
    },
    areYouSingle: {
      text: "Are you single and looking for companionship?",
      yes: "dontClickThatLink",
      no: "dontClickThatLink"
    },
    ClaimWonPrize: {
      text: "Does it claim you won an expensive prize?",
      yes: "reallyYouWon",
      no: "specificallyAskToClick"
    },
    reallyYouWon: {
      text: "Really? You won a prize you didn't enter to win?",
      yes: null,
      no: "dontClickThatLink"
    },
    specificallyAskToClick: {
      text: "Does the post specifically ask you to click it?",
      yes: "lookLegit",
      no: "hoverOverUrl"
    },
    meToo: {
      text: "Me too! I like long walks on the beach, holding hands... Don't click that link.",
      yes: null,
      no: null,
      bodyClass: "danger"
    },
    promiseGoodLuck: {
      text: "Is it promising good luck if you share it with 80 friends?",
      yes: "thoughtLogically",
      no: "friendWouldShare"
    },
    thoughtLogically: {
      text: "Have you thought logically about why these posts exist?",
      yes: "friendWouldShare",
      no: null
    },
    friendWouldShare: {
      text: "Is it something your friend would typically share?",
      yes: "lookLegit",
      no: "postBadEnglish"
    },
    postBadEnglish: {
      text: "Is post bad english make big promise you lose fat today?",
      yes: "dontClickThatLink",
      no: "seeFullUrl",
    },
    seeFullUrl: {
      text: "Can you see the full URL and not a shortened one?",
      yes: "lookLegit",
      no: "specificallyAskToClick"
    },
    dontClickThatLink: {
      text: "Don't click that link!",
      yes: null,
      no: null,
      bodyClass: "danger"
    },
    clickThatLink: {
      text: "Go ahead. Click that link.",
      yes: null,
      no: null,
      bodyClass: "safe"
    }
  },

  rootNodes: ["inSearchResult", "inEmail", "inAd", "inSocialFeed"],

  init: function() {
    var that = this;
    var html = ""
    this.rootNodes.forEach(function(rootNodeId) {
      html += that.render(rootNodeId);
    });
    $("#question_container").html(html)
  },

  present: function(id) {
    if (html = this.render(id)) {
      $("#question_container").fadeOut("fast", function() {
        $(this).html(html).fadeIn("fast");
      });
      if (bodyClass = this.nodes[id].bodyClass) {
        $("body").removeClass("caution safe danger").addClass(bodyClass);
      }
    }
  },

  render: function(id) {
    if (node = this.nodes[id]) {
      var html = "<div class='node node-" + id + "' id='" + id + "'>";
      if (node.text.length > 70) {
        html += "  <h2 class='big'>" + node.text + "</h2>";
      } else {
        html += "  <h2>" + node.text + "</h2>";
      }
      html += "  <div class='answers'>";
      if (node.yes) {
        html += "    <a class='btn btn-warning btn-lg answer yes-answer' href='#' data-node-id='" + node.yes + "' role='button'>Yes</a>";
      }
      if (node.no) {
        html += "    <a class='btn btn-warning btn-lg answer no-answer' href='#' data-node-id='" + node.no + "' role='button'>No</a>";
      }
      html += "  </div>";
      html += "</div>"
      return html;
    } else {
      console.error("No node with ID: " + id)
      return false;
    }
  },
}

$(document).ready(function() {
  App.flowChart.init();
  $("#question_container").on("click", "a.answer", function(e) {
    e.preventDefault();
    App.flowChart.present($(this).attr("data-node-id"))
  });
});
