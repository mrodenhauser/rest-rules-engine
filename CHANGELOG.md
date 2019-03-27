# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# 0.1.0 (2019-03-27)


### Bug Fixes

* **audit:** Named rule set was missing the date audit properties so those were added. ([cc926d2](https://github.com/mrodenhauser/rest-rules-engine/commit/cc926d2))
* **cleanup:** Removed unused data files and libraries ([97d9f9f](https://github.com/mrodenhauser/rest-rules-engine/commit/97d9f9f))
* **condition:** Fixed condition spec to allow nesting ([4274aa4](https://github.com/mrodenhauser/rest-rules-engine/commit/4274aa4))
* **engine:** Removed engines route file and supporting code ([7ea2bd2](https://github.com/mrodenhauser/rest-rules-engine/commit/7ea2bd2))
* **errors:** Added better error responses and console logging of errors ([55f1716](https://github.com/mrodenhauser/rest-rules-engine/commit/55f1716))
* **general:** Removed unused files and fixed reference in db.helper ([9791fe2](https://github.com/mrodenhauser/rest-rules-engine/commit/9791fe2))
* **logs:** Fixed logging to log ip and also return 400 on known errors ([c58d2af](https://github.com/mrodenhauser/rest-rules-engine/commit/c58d2af))
* **logs:** Removed engines route and unused views/public folders ([57c650d](https://github.com/mrodenhauser/rest-rules-engine/commit/57c650d))
* **run:** Changed the run endpoint for id to pull from the mongodb store instead of local files ([7921d76](https://github.com/mrodenhauser/rest-rules-engine/commit/7921d76))
* **run:** Changed the run method to get input from validation mw ([45b96a6](https://github.com/mrodenhauser/rest-rules-engine/commit/45b96a6))
* **service:** Fixed insert and update functions ([9784334](https://github.com/mrodenhauser/rest-rules-engine/commit/9784334))
* **specs:** Fixed pattern validation for mongo ids and fixed content type responses ([f2bf28d](https://github.com/mrodenhauser/rest-rules-engine/commit/f2bf28d))
* **specs:** Fixed specs that had missing content types and removed run by name ([2bf9d2c](https://github.com/mrodenhauser/rest-rules-engine/commit/2bf9d2c))


### Features

* **conditions:** Added specs and routes for condition crud operations ([0e75e7c](https://github.com/mrodenhauser/rest-rules-engine/commit/0e75e7c))
* **fact_run:** Added new endpoint for fact run ([d089138](https://github.com/mrodenhauser/rest-rules-engine/commit/d089138))
* **fact_run:** Added specs for fact run method ([fe8ea9c](https://github.com/mrodenhauser/rest-rules-engine/commit/fe8ea9c))
* **jwt:** Added jwt middleware and implemented in routing ([53e51b2](https://github.com/mrodenhauser/rest-rules-engine/commit/53e51b2))
* **logging:** Standardized logging ([501706a](https://github.com/mrodenhauser/rest-rules-engine/commit/501706a))
* **rule_eval:** Added method for evaluating rules against a fact ([ae3a9be](https://github.com/mrodenhauser/rest-rules-engine/commit/ae3a9be))
* **rule_sets:** Added service and routes for rule sets ([d17a149](https://github.com/mrodenhauser/rest-rules-engine/commit/d17a149))
* **rule_sets:** Added specs for rule sets definitions and paths ([4844aec](https://github.com/mrodenhauser/rest-rules-engine/commit/4844aec))
* **run:** Added run post method that takes in rules, facts and flag for first result ([3157e3a](https://github.com/mrodenhauser/rest-rules-engine/commit/3157e3a))
* **service:** Added crud operations for conditions events and rules ([69490bd](https://github.com/mrodenhauser/rest-rules-engine/commit/69490bd))
* **specs:** Added specs for engine essentials ([2873ebf](https://github.com/mrodenhauser/rest-rules-engine/commit/2873ebf))
* **specs:** Patch functionality for rule sets ([8499523](https://github.com/mrodenhauser/rest-rules-engine/commit/8499523))
