/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#include <gtest/gtest.h>

#include <ABI44_0_0React/ABI44_0_0renderer/components/scrollview/ScrollViewComponentDescriptor.h>
#include <ABI44_0_0React/ABI44_0_0renderer/components/text/ParagraphComponentDescriptor.h>
#include <ABI44_0_0React/ABI44_0_0renderer/components/text/RawTextComponentDescriptor.h>
#include <ABI44_0_0React/ABI44_0_0renderer/components/text/TextComponentDescriptor.h>
#include <ABI44_0_0React/ABI44_0_0renderer/components/view/ViewComponentDescriptor.h>

#include <ABI44_0_0React/ABI44_0_0renderer/element/Element.h>
#include <ABI44_0_0React/ABI44_0_0renderer/element/testUtils.h>

using namespace ABI44_0_0facebook::ABI44_0_0React;

TEST(traitCastTest, testOne) {
  auto builder = simpleComponentBuilder();

  auto viewShadowNode = std::shared_ptr<ViewShadowNode>{};
  auto scrollViewShadowNode = std::shared_ptr<ScrollViewShadowNode>{};
  auto paragraphShadowNode = std::shared_ptr<ParagraphShadowNode>{};
  auto textShadowNode = std::shared_ptr<TextShadowNode>{};
  auto rawTextShadowNode = std::shared_ptr<RawTextShadowNode>{};

  // clang-format off
  auto element =
      Element<ScrollViewShadowNode>()
        .reference(scrollViewShadowNode)
        .children({
          Element<ParagraphShadowNode>()
            .reference(paragraphShadowNode)
            .children({
              Element<TextShadowNode>()
                .reference(textShadowNode),
              Element<RawTextShadowNode>()
                .reference(rawTextShadowNode)
            }),
          Element<ViewShadowNode>()
            .reference(viewShadowNode),
        });
  // clang-format on

  auto rootShadowNode = builder.build(element);

  // Casting `nullptr` returns `nullptrs`.
  ABI44_0_0EXPECT_FALSE(traitCast<LayoutableShadowNode const *>(nullptr));
  ABI44_0_0EXPECT_FALSE(traitCast<YogaLayoutableShadowNode const *>(nullptr));

  // `ViewShadowNode` is `LayoutableShadowNode` and `YogaLayoutableShadowNode`.
  ABI44_0_0EXPECT_TRUE(traitCast<LayoutableShadowNode const *>(viewShadowNode.get()));
  ABI44_0_0EXPECT_TRUE(
      traitCast<YogaLayoutableShadowNode const *>(viewShadowNode.get()));
  ABI44_0_0EXPECT_NO_FATAL_FAILURE(
      traitCast<LayoutableShadowNode const &>(*viewShadowNode));
  ABI44_0_0EXPECT_NO_FATAL_FAILURE(
      traitCast<YogaLayoutableShadowNode const &>(*viewShadowNode));

  // `ScrollViewShadowNode` is `LayoutableShadowNode` and
  // `YogaLayoutableShadowNode`.
  ABI44_0_0EXPECT_TRUE(
      traitCast<LayoutableShadowNode const *>(scrollViewShadowNode.get()));
  ABI44_0_0EXPECT_TRUE(
      traitCast<YogaLayoutableShadowNode const *>(scrollViewShadowNode.get()));
  ABI44_0_0EXPECT_NO_FATAL_FAILURE(
      traitCast<LayoutableShadowNode const &>(*scrollViewShadowNode));
  ABI44_0_0EXPECT_NO_FATAL_FAILURE(
      traitCast<YogaLayoutableShadowNode const &>(*scrollViewShadowNode));

  // `ParagraphShadowNode` is `LayoutableShadowNode` and
  // `YogaLayoutableShadowNode`.
  ABI44_0_0EXPECT_TRUE(
      traitCast<LayoutableShadowNode const *>(paragraphShadowNode.get()));
  ABI44_0_0EXPECT_TRUE(
      traitCast<YogaLayoutableShadowNode const *>(paragraphShadowNode.get()));
  ABI44_0_0EXPECT_NO_FATAL_FAILURE(
      traitCast<LayoutableShadowNode const &>(*paragraphShadowNode));
  ABI44_0_0EXPECT_NO_FATAL_FAILURE(
      traitCast<YogaLayoutableShadowNode const &>(*paragraphShadowNode));

  // `TextShadowNode` is *not* `LayoutableShadowNode` nor
  // `YogaLayoutableShadowNode`.
  ABI44_0_0EXPECT_FALSE(traitCast<LayoutableShadowNode const *>(textShadowNode.get()));
  ABI44_0_0EXPECT_FALSE(
      traitCast<YogaLayoutableShadowNode const *>(textShadowNode.get()));
  ABI44_0_0EXPECT_DEATH_IF_SUPPORTED(
      traitCast<LayoutableShadowNode const &>(*textShadowNode), "");
  ABI44_0_0EXPECT_DEATH_IF_SUPPORTED(
      traitCast<YogaLayoutableShadowNode const &>(*textShadowNode), "");

  // `RawTextShadowNode` is *not* `LayoutableShadowNode` nor
  // `YogaLayoutableShadowNode`.
  ABI44_0_0EXPECT_FALSE(
      traitCast<LayoutableShadowNode const *>(rawTextShadowNode.get()));
  ABI44_0_0EXPECT_FALSE(
      traitCast<YogaLayoutableShadowNode const *>(rawTextShadowNode.get()));
  ABI44_0_0EXPECT_DEATH_IF_SUPPORTED(
      traitCast<LayoutableShadowNode const &>(*rawTextShadowNode), "");
  ABI44_0_0EXPECT_DEATH_IF_SUPPORTED(
      traitCast<YogaLayoutableShadowNode const &>(*rawTextShadowNode), "");
}
